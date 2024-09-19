import type { AuthConfig } from "@auth/core"
import type { LoggerInstance, PagesOptions } from "@auth/core/types"

import adapter from "src/auth/auth-config/adapter"
import callbacks from "src/auth/auth-config/callbacks"
import events from "src/auth/auth-config/events"
import providers from "src/auth/auth-config/providers"

import { NODE_ENV } from "src/utils/secrets"

import routes from "src/routes/routes"

const session: AuthConfig["session"] = { strategy: "jwt" }

const debug: AuthConfig["debug"] = NODE_ENV === "development"

const pages: Partial<PagesOptions> = {
    error: routes.error,
    signIn: routes.auth.login,
    signOut: routes.auth.signOut,
}

const logger: Partial<LoggerInstance> = {
    // can also get metadata from the debug callback
    debug(code) {
        console.debug("Next Auth  Logger: Logging Console Debug", { code })
    },
    error(error: Error) {
        console.error("Next Auth Logger: Logging Console Error", { error })
    },
    warn(code) {
        console.warn("Next Auth Logger: Logging Console Warning", { code })
    },
}

const authConfig: AuthConfig = {
    adapter, // next auth uses this to perform crud operations on the user and account tables
    callbacks, // allow you to modify the sign-in process, json web token and session object
    debug,
    events, // auth events like sign-in, sign out, create/update user, link account, etc
    logger, // get information from next auth authentication flow
    pages, // customize the pages that are used for the sign in and sign out
    providers, // define the providers that you want to use with next auth, for example google, facebook, email and pw
    session, // modify the session's maxAge, strategy, etc
}

export default authConfig