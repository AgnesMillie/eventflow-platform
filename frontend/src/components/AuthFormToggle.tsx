interface AuthFormToggleProps {
  readonly isLoginView: boolean;
  readonly toggleView: () => void;
}

export function AuthFormToggle({ isLoginView, toggleView }: AuthFormToggleProps) {
  return (
    <p className="text-center text-sm text-slate-400 mt-8">
      {isLoginView ? 'Não tem uma conta?' : 'Já tem uma conta?'}
      <button
        type="button"
        onClick={toggleView}
        className="font-semibold text-sky-400 hover:text-sky-300 ml-2 focus:outline-none"
      >
        {isLoginView ? 'Registe-se' : 'Faça Login'}
      </button>
    </p>
  );
}

