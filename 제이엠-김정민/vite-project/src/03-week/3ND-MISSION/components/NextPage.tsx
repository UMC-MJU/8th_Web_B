import React from 'react'



export default function NextPage(page) {

    return (
        <div>
            <button onClick={()=> setPage((page): number => page -1) }>{`<`}</button>
    </div>
    )
}
