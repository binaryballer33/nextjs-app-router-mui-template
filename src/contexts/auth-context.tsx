'use client'

import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import type { User } from 'src/models/user'
import { createClient as createSupabaseClient } from 'src/utils/supabase/client'

export interface AuthContextValue {
  user: User | null
  error: string | null
  isLoading: boolean
  checkSession: () => Promise<void>
}

export const UserContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [supabaseClient] = useState(createSupabaseClient())
  const [state, setState] = useState<{
    user: User | null
    error: string | null
    isLoading: boolean
  }>({
    user: null,
    error: null,
    isLoading: true,
  })

  // auth provider loads and checks the session and upates the state of the user
  const checkSession = useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await supabaseClient.auth.getSession()

      if (error) {
        console.error(error)
        setState((prev) => ({
          ...prev,
          user: null,
          error: `Error With Checking Session In Auth Provider ${error.message}`,
        }))
        return
      }

      if (data?.session?.user) {
        // if there is a user in the session, set the user to the user in the session
        setState((prev) => ({ ...prev, user: data.session.user as unknown as User, error: null }))
      } else {
        // if there is no user in the session, set the user to null
        setState((prev) => ({ ...prev, user: null, error: null }))
      }
    } catch (err) {
      console.error(err)
      setState((prev) => ({ ...prev, user: null, error: `Error With Checking Session In Auth Provider ${err}` }))
    }
  }, [supabaseClient.auth])

  useEffect(() => {
    ;(async () => {
      await checkSession().catch(() => {})
      setState((prev) => ({ ...prev, isLoading: false }))
    })().catch(() => {})
  }, [checkSession])

  return (
    <UserContext.Provider
      value={{
        ...state,
        checkSession,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const UserConsumer = UserContext.Consumer
