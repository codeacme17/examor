interface HeaderProps {
  title: string
  subTitle?: string
}

export const Header = ({ title, subTitle }: HeaderProps) => {
  return (
    <header className="border-b pb-8 mb-7">
      <h1 className="font-bold text-2xl">{title}</h1>
      <sub className="text-sm text-muted-foreground">{subTitle}</sub>
    </header>
  )
}
