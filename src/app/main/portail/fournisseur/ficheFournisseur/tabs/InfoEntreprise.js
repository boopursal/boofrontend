import React from 'react';
import { FuseAnimateGroup,FuseUtils } from '@fuse';
import { Typography, GridList, GridListTile, GridListTileBar, IconButton, Icon } from '@material-ui/core';
import { useSelector } from 'react-redux';

function InfoEntreprise() {

    const data = useSelector(({ ficheFournisseurApp }) => ficheFournisseurApp.fournisseur.data);
    const produitsApercu = useSelector(({ ficheFournisseurApp }) => ficheFournisseurApp.fournisseur.produitsApercu);
    const loadingProduitsApercu = useSelector(({ ficheFournisseurApp }) => ficheFournisseurApp.fournisseur.loadingProduitsApercu);
    const loading = useSelector(({ ficheFournisseurApp }) => ficheFournisseurApp.fournisseur.loading);

    if (!data) {
        return null;
    }

    /*
    const {general, work, contact, groups, friends} = data;
    */
    return (
        <div className="p-20">
            {loading ? 'loading ... ' :
                <FuseAnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >
                    <Typography className=" text-justify leading-relaxed text-14">
                        {data.description}
                    </Typography>
                    <Typography variant="h2" className="my-24 p-12 bg-gray-300 uppercase font-bold text-16">
                        Aperçu du catalogue produits
        </Typography>

                    <GridList className="" spacing={8} cols={0}>
                        {
                            loadingProduitsApercu ? 'loading..' :
                                produitsApercu && produitsApercu.map((item, index) => (
                                    <GridListTile
                                        classes={{
                                            root: "w-full sm:w-1/2 md:w-1/4",
                                            tile: "rounded-8"
                                        }}
                                        key={index}
                                    >
                                        <img src={item.featuredImageId ?
                                            FuseUtils.getUrl() + item.featuredImageId.url
                                            :
                                            'assets/images/ecommerce/product-placeholder.jpg'
                                        } alt={item.titre} />
                                        <GridListTileBar
                                            title={item.titre}
                                            actionIcon={
                                                <IconButton>
                                                    <Icon className="text-white opacity-75">info</Icon>
                                                </IconButton>
                                            }
                                        />
                                    </GridListTile>
                                ))
                        }


                    </GridList>

                    <Typography variant="h2" className="my-24 p-12 bg-gray-300 uppercase font-bold text-16">
                        Actavités
        </Typography>
                    <div>
                        {
                            data.sousSecteurs && data.sousSecteurs.map((item, index) => (
                                <span key className="uppercase mr-8 border border-teal-darkest bg-teal-lighter font-bold text-teal-darkest text-xs rounded-full py-4 px-6">
                                    {item.name}
                                </span>
                            ))
                        }

                    </div>

                </FuseAnimateGroup>
            }

        </div>

    );
}

export default InfoEntreprise;
