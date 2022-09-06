import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDebounce} from '../hooks/useDebounce';
import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/github/github.api";
import {RepoCard} from "../components/RepoCard";

export const HomePage = () => {
    const [search, setSearch] = useState('');
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true
    })
    const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }

    const onUserClick = (username: string) => {
        fetchRepos(username)
        setDropdown(false)
    }

    useEffect(() => {
        setDropdown(debounced.length > 3 && data?.length! > 0)
    }, [debounced, data])

    return (
        <div className={'flex justify-center pt-10 mx-auto'}>
            {isError && <p className={'text-center text-red-600'}>Something went wrong :(</p>}

            <div className={'relative w-[560px]'}>
                <input
                    type="text"
                    value={search}
                    onChange={onSearchInputChange}
                    className={'border py-2 px-4 w-full h-[42px] mb-2'}
                    placeholder={'Search for GitHub username...'}
                />
                {dropdown && <ul className={' list-none absolute top-[42px] left-0 right-0 shadow-md bg-white'}>
                    {isLoading && <p className={'text-center'}>Loading</p>}
                    {data?.map(user => (
                        <li
                            className={'px-4 py-2 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer flex items-center'}
                            key={user.id}
                            onClick={() => onUserClick(user.login)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5 mr-2"
                            >
                                <path fillRule="evenodd"
                                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                      clipRule="evenodd"/>
                            </svg>
                            {user.login}</li>
                    ))}
                </ul>}

                <div className={'container'}>
                    {areReposLoading && <p className={'text-center'}>Repos are loading</p>}
                    {repos?.map(repo =>
                        <RepoCard repo={repo} key={repo.id}/>
                    )}
                </div>
            </div>

        </div>
    );
};
