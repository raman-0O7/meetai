
interface Props {
  children: React.ReactNode;
}
const AuthLayout = ({children}: Props) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        {children}
      </div>
    </div>
  )
};

export default AuthLayout;
