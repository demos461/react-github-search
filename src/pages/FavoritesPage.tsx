import React from 'react';
import {useAppSelector} from "../hooks/useAppSelector";
import {RepoCard} from "../components/RepoCard";

export const FavoritesPage = () => {
    const {favorites} = useAppSelector(state => state.github)

    if (favorites.length === 0) return <p className={'text-center'}>No items :(</p>

    return (
        <div className={'pt-10 mx-auto w-[560px]'}>
            {favorites.map(fRepo => (
                <RepoCard repo={fRepo}/>
            ))}
        </div>
    );
};
