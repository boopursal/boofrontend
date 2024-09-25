import React, { createRef, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { connect } from 'react-redux';
import MobileDetect from 'mobile-detect';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Détection de l'appareil mobile
const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const handlerNameByEvent = {
    'ps-scroll-y': 'onScrollY',
    'ps-scroll-x': 'onScrollX',
    'ps-scroll-up': 'onScrollUp',
    'ps-scroll-down': 'onScrollDown',
    'ps-scroll-left': 'onScrollLeft',
    'ps-scroll-right': 'onScrollRight',
    'ps-y-reach-start': 'onYReachStart',
    'ps-y-reach-end': 'onYReachEnd',
    'ps-x-reach-start': 'onXReachStart',
    'ps-x-reach-end': 'onXReachEnd',
    // Ajout des événements tactiles
    'touchstart': 'onTouchStart',
    'touchmove': 'onTouchMove',
    'touchend': 'onTouchEnd'
};
Object.freeze(handlerNameByEvent);

const useStyles = makeStyles((theme) => ({
    root: {}
}));

const FuseScrollbars = React.forwardRef(function FuseScrollbars(props, ref) {
    ref = ref || createRef();
    const ps = useRef(null);
    const handlerByEvent = useRef(new Map());
    const classes = useStyles();
    const { customScrollbars } = props;

    const hookUpEvents = useCallback(() => {
        Object.keys(handlerNameByEvent).forEach((key) => {
            const callback = props[handlerNameByEvent[key]];
            if (callback) {
                const handler = (event) => {
                    // Prévenir le comportement par défaut pour les événements tactiles
                    if (event.type.startsWith('touch')) {
                        event.preventDefault();
                    }
                    callback(ref.current, event);
                };
                handlerByEvent.current.set(key, handler);
                ref.current.addEventListener(key, handler, false);
            }
        });
    }, [props, ref]);

    const unHookUpEvents = useCallback(() => {
        handlerByEvent.current.forEach((handler, key) => {
            if (ref.current) {
                ref.current.removeEventListener(key, handler, false);
            }
        });
        handlerByEvent.current.clear();
    }, [ref]);

    const destroyPs = useCallback(() => {
        unHookUpEvents();
        if (ps.current) {
            ps.current.destroy();
            ps.current = null;
        }
    }, [unHookUpEvents]);

    const createPs = useCallback(() => {
        if (!isMobile && ref.current && !ps.current) {
            ps.current = new PerfectScrollbar(ref.current, props.option);
            hookUpEvents();
        }
    }, [hookUpEvents, props.option, ref]);

    useEffect(() => {
        if (ps.current) {
            ps.current.update();
        }
    });

    useEffect(() => {
        if (customScrollbars) {
            createPs();
        } else {
            destroyPs();
        }
    }, [createPs, customScrollbars, destroyPs]);

    useEffect(() => {
        if (props.scrollToTopOnChildChange) {
            ref.current.scrollTop = 0;
        }
    }, [props.children, props.scrollToTopOnChildChange, ref]);

    useEffect(() => {
        return () => {
            destroyPs();
        };
    }, [destroyPs]);

    return (
        <div
            id={props.id}
            className={clsx(classes.root, props.className)}
            style={
                customScrollbars && props.enable && !isMobile ? {
                    position: 'relative',
                    overflow: 'hidden'
                } : {}
            }
            ref={ref}
        >
            {props.children}
        </div>
    );
});

// Connexion avec Redux
function mapStateToProps({ fuse }) {
    return {
        customScrollbars: fuse.settings.current.customScrollbars
    };
}

FuseScrollbars.propTypes = {
    onScrollY: PropTypes.func,
    onScrollX: PropTypes.func,
    onScrollUp: PropTypes.func,
    onScrollDown: PropTypes.func,
    onScrollLeft: PropTypes.func,
    onScrollRight: PropTypes.func,
    onYReachStart: PropTypes.func,
    onYReachEnd: PropTypes.func,
    onXReachStart: PropTypes.func,
    onXReachEnd: PropTypes.func,
    scrollToTopOnChildChange: PropTypes.bool,
};

FuseScrollbars.defaultProps = {
    className: '',
    enable: true,
    scrollToTopOnChildChange: false,
    option: {
        wheelPropagation: true
    },
    ref: undefined,
    onScrollY: undefined,
    onScrollX: undefined,
    onScrollUp: undefined,
    onScrollDown: undefined,
    onScrollLeft: undefined,
    onScrollRight: undefined,
    onYReachStart: undefined,
    onYReachEnd: undefined,
    onXReachStart: undefined,
    onXReachEnd: undefined
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(React.memo(FuseScrollbars));
