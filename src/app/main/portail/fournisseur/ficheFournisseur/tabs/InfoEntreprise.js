import React from 'react';
import { FuseAnimateGroup, FuseUtils } from '@fuse';
import { Typography, GridList, GridListTile, GridListTileBar, IconButton, Icon } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Link2 from '@material-ui/core/Link';

function InfoEntreprise(props) {
    const params = props.match.params;
    const { id, slug } = params;
    const data = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseur.data);
    const produitsApercu = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseur.produitsApercu);
    const loadingProduitsApercu = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseur.loadingProduitsApercu);
    const loading = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseur.loading);

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
                    <Typography className=" text-justify leading-relaxed text-14 whitespace-pre-line" >
                        {data.description}
                    </Typography>
                    <Typography variant="h2" className="my-24 p-12 bg-gray-300 uppercase font-bold text-16">
                        Aperçu du catalogue produits
                    </Typography>
                    {
                        !loadingProduitsApercu ?
                        (
                            produitsApercu.length > 0 ?
                            <GridList className="" spacing={8} cols={0}>
                                {
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
                                                    <IconButton component={Link} to={`/detail-produit/${item.sousSecteurs.slug}/${item.categorie.slug}/${item.id}-${item.slug}`}>
                                                        <Icon className="text-white opacity-75">arrow_forward_ios</Icon>
                                                    </IconButton>
                                                }
                                            />
                                        </GridListTile>
                                    ))
                                }


                            </GridList>
                            : <div className="text-center mt-16">
                                Aucun produit n'est ajouté par cette entreprise
                            </div>
                            )
                            :<div className="text-center mt-16">
                            Chargement...
                        </div>
                    }

                    {
                        produitsApercu.length > 0 &&
                        <div className="text-right mt-16">
                            <Link2 component={Link} to={`/entreprise/${id}-${slug}/produits`} className="">
                                Voir tout le catalogue de produits >
                            </Link2>
                        </div>
                    }





                    <Typography variant="h2" className="my-24 p-12 bg-gray-300 uppercase font-bold text-16">
                        Actavités
                    </Typography>
                    <div>
                        {
                            data.sousSecteurs && data.sousSecteurs.map((item, index) => (
                                <span key={index} className="uppercase mr-8 border border-teal-darkest bg-teal-lighter font-bold text-teal-darkest text-xs rounded-full py-4 px-6">
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
