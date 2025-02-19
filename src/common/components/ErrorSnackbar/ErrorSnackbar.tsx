import { SyntheticEvent } from "react"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { selectAppError } from "@/app/app-selectors"
import { setAppErrorAC } from "@/app/app-reducer"

export const ErrorSnackbar = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(selectAppError)
  // const [open, setOpen] = useState(true)

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return dispatch(setAppErrorAC(null))
    }
    setTimeout(() => dispatch(setAppErrorAC(null), 2000))
  }
  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {error && error}
      </Alert>
    </Snackbar>
  )
}
