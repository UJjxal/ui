import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

export const SnackBarProvider = forwardRef((props, ref) =>  {
    const [ísAlert, setAlert] = useState({status: false, severity: "success", message: '', horizontal: "right",})

    useImperativeHandle(ref, () => ({
        show({status, severity, message, horizontal = 'right'}) {
            setAlert({status, severity, message, horizontal});
        },
    }));
    
    return (
        <Snackbar
            open={ísAlert.status}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'bottom', horizontal: ísAlert.horizontal }}
            onClose={() => setAlert({status: false, severity: "success", message: '', horizontal: "right"})}>
            <Alert variant="filled" severity={ísAlert.severity} sx={{ width: '100%' }}>{ísAlert.message}</Alert>
        </Snackbar>
    )
    
});

// const useSnackBars = () => useContext(SnackBarProvider);

// export default useSnackBars;



