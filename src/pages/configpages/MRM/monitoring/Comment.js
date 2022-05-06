import React, { useState } from 'react';
import {Button} from "antd";
import { TextField } from "@material-ui/core";
import Loader from "../../../../utilities/Loader";


const Comment = (props) => {
    return (
        <div className="p-3 mt15 border radius6 text-right">
            <TextField
                label=""
                multiline
                rows={3}
                id={props.id}
                value={props.comment}
                placeholder="Add Comment"
                variant="outlined"
                autoComplete="off"
                className="w-100"
                style={{
                    // width: "90%",
                    backgroundColor: "#fff",
                    borderRadius: "4px",
                }}
                onChange={props.onChange}
            />
            {props.submittingcomment ? (
                <Loader
                    type="TailSpin"
                    color="#000000"
                    height={20}
                    style={{ color: "#000000" }}
                />
            ) : (
                <Button
                    onClick={props.handleSubmitcomment}
                    className='blue-bg mt5'
                    type="primary"
                >
                    Submit Comment
                </Button>
            )}
            
        </div>
    )
}

export default Comment