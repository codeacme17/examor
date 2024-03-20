import { Header } from '@/components/share/header'
import { ProfileForm } from './_components/profile-form'

const Profile = () => {
  return (
    <section>
      <Header
        title="Profile"
        subTitle="You can manage your config here"
      />

      <ProfileForm />
    </section>
  )
}

export default Profile
