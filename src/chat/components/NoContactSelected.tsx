export const NoContactSelected = () => {
  return (
    <div className="flex h-full items-center justify-center flex-col text-center p-4">
      <div className="mb-4 text-muted-foreground">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      </div>
      <h1 className="text-2xl font-semibold mb-2">Seleccione un contacto</h1>
      <p className="text-muted-foreground">Elija un contacto de la lista para comenzar una conversación</p>
    </div>
  )
}