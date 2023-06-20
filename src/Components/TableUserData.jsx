import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import React from 'react'
import { useTheme } from "../Context/ThemeContext"


const TableUserData = ({data}) => {

    console.log(data);

    const {theme} = useTheme();

    const cellStyle = {
        color: theme.textColor,
        textAlign: "center"
    }
    
  return (
    <div className="table">
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                          <TableCell style={cellStyle}>
                            WPM
                        </TableCell>
                        <TableCell style={cellStyle}>
                            Accuracy
                        </TableCell>
                        <TableCell style={cellStyle}>
                            Characters
                        </TableCell>
                         <TableCell style={cellStyle}>
                            Date
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((item)=> (
                            <TableRow>
                                <TableCell style={cellStyle}>{item.wpm}</TableCell>
                                <TableCell style={cellStyle}>{item.accuracy}</TableCell>
                                <TableCell style={cellStyle}>{item.characters}</TableCell>
                                <TableCell style={cellStyle}>{item.timeStamp.toDate().toLocaleString()}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}

export default TableUserData