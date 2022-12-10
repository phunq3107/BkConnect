import {Link, Typography} from "@mui/material";
import React from 'react'

export const renderNotiString = (notiString) => {
    const dividedStr = divideStr(notiString)
    return(
        <Typography>
            {
                dividedStr.map((str,idx) => {
                    console.log(str)
                    if (str[0] === '{'){
                        const props = getTokenObject(str)
                        return (
                            <Link href={props.href}>
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
        </Typography>
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
        if (c === '$'){
            res.push(str)
            str =""
        }
        else if (c === '}'){
            res.push(str)
            str = ""
        }
        else str += c
    }
   return res
}