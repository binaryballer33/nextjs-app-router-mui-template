import { login } from 'src/actions/auth/login'
import { register } from 'src/actions/auth/register'

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={register}>Sign up</button>
    </form>
  )
}
