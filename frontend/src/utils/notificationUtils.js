import {Link, Typography} from "@mui/material";
import React from 'react'

const START_TOKEN = '$'

export const renderNotiString = (notiString) => {
    const dividedStr = divideStr(notiString)
    return(
        <>
            {
                dividedStr.map((str,idx) => {
                    if (str[0] === '{'){
                        const props = getTokenObject(str)
                        return (
                            <Link href={props.href} key={idx}>
                                {props.title}
                            </Link>
                        )
                    }
                    return (
                        <React.Fragment key={idx}>
                            {str}
                        </React.Fragment>
                    )
                })
            }
        </>
    )
}


const getTokenObject = (token) => {
    const arr = token.slice(1,token.length-1).split('|')
    let props ={}
    for (const e of arr){
        const [key,value] = e.split('=')
        props[key] = value
    }
    return props
}

const divideStr = (notiString) => {
    const res = []
    let str= ""
    for (const c of notiString){
        if (c === START_TOKEN){
            res.push(str)
            str =""
        }
        else if (c === '}'){
            res.push(str)
            str = ""
        }
        else str += c
    }
    if (str !== ""){
        res.push(str)
    }
   return res
}