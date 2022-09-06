import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {githubActions} from "../store/github/github.slice";


export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators({
        ...githubActions
    }, dispatch)
}