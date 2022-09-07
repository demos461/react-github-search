import React from 'react';
import {Link} from "react-router-dom";

export const Navigation = () => {
    return (
        <nav className={'flex justify-between items-center h-[60px] px-8 shadow-md bg-gray-800 text-white'}>
            <div className={'flex'}>
                <h3 className={'font-bold mr-2'}>Github Search</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </div>
            <span>
                <Link
                    to={'/'}
                    className={'text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-4'}
                >Home</Link>
                <Link
                    to={'/favorites'}
                    className={'text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}
                >Favorites</Link>
            </span>

        </nav>
    );
};
