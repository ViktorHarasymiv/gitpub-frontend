import css from './Layout.module.css';

interface AuthTypeProps {
  params: Promise<{ authType: string }>;
  children: React.ReactNode;
}
const AuthLayout = async ({ children, params }: AuthTypeProps) => {
  const { authType } = await params;

  return (
    <div className={css.layout}>
      <div className={css.mainContent}>{children}</div>
      {authType === 'register' ? (
        <div className={css.imgRegister} />
      ) : authType === 'login' ? (
        <div className={css.imgLogin} />
      ) : null}
    </div>
  );
};

export default AuthLayout;
