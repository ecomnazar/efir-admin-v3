import { UserList } from "@/widgets/user-list"

// add: user profile data update

export const UserPage = () => {
  return (
    <section>
      <h2 className="text-xl mb-4">Users list</h2>
      <UserList />
    </section>
  )
}
