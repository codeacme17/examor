import { Header } from '@/components/share/header'
import { ProfileForm } from './_components/profile-form'

const Profile = () => {
  return (
    <section>
      <Header
        title="Profile"
        subTitle="Can be configured here refer to the required options"
      />

      <ProfileForm />
    </section>
  )
}

export default Profile
