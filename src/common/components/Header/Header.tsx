import { changeThemeModeAC } from "@/app/app-reducer"
import { selectThemeMode } from "@/app/app-selectors"
import { useAppDispatch } from "@/common/hooks"
import { useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import { AppBar, Container, IconButton, Switch, Toolbar } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { NavButton } from "@/common/components"
import { containerSx } from "@/common/styles"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton color="inherit">Sign in</NavButton>
            <NavButton color="inherit">Sign up</NavButton>
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
