import { Link, useRouteError } from 'react-router-dom'

export function Error() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Whoops! 😱</h1>

      <p className="mb-4 mt-2 max-w-xl text-center text-4xl text-accent-foreground">
        Algum erro aconteceu na aplicação, segue mais detalhes abaixo:
      </p>

      {/* It is generally not recommended to show this to users. */}
      <pre>{error.message || JSON.stringify(error)}</pre>

      <p className="mt-4 text-accent-foreground">
        Voltar para o{' '}
        <Link to="/" className="text-sky-500 dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  )
}
