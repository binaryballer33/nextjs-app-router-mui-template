import { alpha, Badge, Box, Link, Typography, useTheme } from "@mui/material"

import RouterLink from "src/components/base/router-link"

type LogoProps = {
    dark?: boolean
    isLinkStatic?: boolean
}

export default function Logo({ dark = false, isLinkStatic = false }: LogoProps) {
    const theme = useTheme()

    const getColor = (): string => {
        if (dark) return theme.palette.common.white
        if (theme.palette.mode === "dark") return theme.palette.common.white

        return theme.palette.common.black
    }

    const linkProps = isLinkStatic
        ? {
              href: "",
              onClick: (e: { preventDefault: () => any }) => e.preventDefault(),
          }
        : { href: "/" }

    return (
        <Box
            sx={{
                position: "relative",

                transition: (transitionTheme) => transitionTheme.transitions.create(["transform"]),
                transform: "scale(1)",
                "&:hover": {
                    transform: "scale(1.05)",
                },
                display: "flex",
                alignItems: "center",
            }}
        >
            <Link
                component={RouterLink}
                {...linkProps}
                sx={{
                    color: getColor(),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    "&:hover .MuiBadge-badge": {
                        opacity: 1,
                        visibility: "initial",
                    },
                }}
            >
                <Badge
                    sx={{
                        ".MuiBadge-badge": {
                            opacity: 0,
                            transition: (transitionTheme) =>
                                transitionTheme.transitions.create(["opacity", "visibility"]),
                            visibility: "hidden",
                            fontSize: theme.typography.pxToRem(10),
                            right: -5,
                            top: -5,
                            fontWeight: 700,
                            letterSpacing: "-.45px",
                            p: "3px 5px 5px",
                            transform: "scale(.9)",
                        },
                    }}
                    overlap="circular"
                    color={dark ? "success" : "info"}
                    badgeContent="1.0"
                >
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: `${theme.shape.borderRadius * 2}px`,
                            border: `2px solid ${theme.palette.primary.main}`,
                            background: `linear-gradient(198deg, ${alpha(theme.palette.primary.main, 0.32)} 18%, transparent 100%)`,
                        }}
                    />
                </Badge>
                <Typography
                    component="span"
                    sx={{
                        fontSize: "18px",
                        ml: "-24px",
                        mt: "-1px",
                        mr: "34px",
                        lineHeight: "18px",
                    }}
                    fontWeight={700}
                    color={theme.palette.mode === "light" ? "black" : "gray"}
                >
                    M
                </Typography>
                <Typography
                    component="span"
                    sx={{
                        fontSize: "18px",
                        letterSpacing: "-.45px",
                        ml: "-23px",
                        mt: "-1px",
                        lineHeight: "18px",
                    }}
                    fontWeight={500}
                    color={theme.palette.mode === "light" ? "black" : "gray"}
                >
                    TEC
                </Typography>
            </Link>
        </Box>
    )
}
