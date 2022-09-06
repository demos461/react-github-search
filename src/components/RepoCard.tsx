import React from 'react';
import {IRepo} from "../models/models";
import {useActions} from "../hooks/useActions";
import {useAppSelector} from "../hooks/useAppSelector";


export const RepoCard = ({repo}: { repo: IRepo }) => {
    const favorites = useAppSelector(state => state.github.favorites)
    const {addFavorite, removeFavorite} = useActions()

    const addFavoriteClick = () => {
        addFavorite(repo.html_url)
    }

    const removeFavoriteClick = () => {
        removeFavorite(repo.html_url)
    }

    const repoIsFavorite = favorites.includes(repo.html_url)

    return (
        <div
            className={'border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all flex justify-between items-center'}>
            <a href={repo.html_url} target='_blank' rel='noreferrer'>
                <h2 className={'text-lg font-bold'}>{repo.full_name}</h2>
                <p className={'text-sm'}>
                    Forks: <span className={'font-bold mr-2'}>{repo.forks}</span>
                    Watchers: <span className={'font-bold'}>{repo.watchers}</span>
                </p>
                <p className={'text-sm font-thin'}>{repo?.description}</p>
            </a>
            {
                repoIsFavorite
                    ? <svg xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="inherit"
                           className="w-6 h-6 fill-red-700 cursor-pointer"
                           onClick={removeFavoriteClick}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                    </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="w-6 h-6 cursor-pointer"
                           onClick={addFavoriteClick}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                    </svg>
            }
        </div>
    );
};
