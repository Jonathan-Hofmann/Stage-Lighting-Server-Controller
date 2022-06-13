import React, { useState } from "react";

export const MainGrid:React.FC = (props) => {
    const [data, setData] = useState([...Array(50).fill([...Array(100).fill({
            type: null,
        })])]);
        
    return(
        <>
            {data.map((item:any)=>{
                return(
                    <div style={{display:'flex', flexDirection: 'row'}}>
                        {item.map((inner:any)=>{
                            if (inner.type === null) {
                                return(
                                    <div style={{height: '25px', width: '25px', backgroundColor: '#dddddd', border: '1px solid #ffffff'}}>

                                    </div>
                                )
                            }
                        })}
                    </div>
                )
            })}
            <a href="#" onClick={()=>{}}>Speichern</a>
        </>
    )
}

																				