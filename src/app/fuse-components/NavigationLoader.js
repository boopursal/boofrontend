import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import navigationConfig, { filterNavigationByUser } from 'app/fuse-configs/navigationConfig';
import { setNavigation } from 'app/store/actions/fuse';

export default function NavigationLoader() {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  useEffect(() => {
    if (user) {
      const filteredNavigation = filterNavigationByUser(navigationConfig, user);
      console.log('Navigation filtrée:', filteredNavigation);
      dispatch(setNavigation(filteredNavigation));
    }
  }, [user, dispatch]);
  
  return null;
}
