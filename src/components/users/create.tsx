import { Card } from '@tremor/react';
import React, { useContext } from 'react';
import { UserContext } from '.';
import { Form } from './form';
import { useUserActions } from './hooks';
import { RegisteredUser, StatusUser } from './users.interface';

export function Create() {
  const { createNewUser } = useUserActions();
  const { user, setUser } = useContext(UserContext);

  if (user.id) {
    return null;
  }

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get('name')?.toString().trim() as string;
    const email = formData.get('email')?.toString().trim() as string;
    const phone = formData.get('phone')?.toString().trim() as string;
    const website = formData.get('website')?.toString().trim() as string;

    createNewUser({ name, email, phone, website, status: StatusUser.ACTIVE });
    form.reset();
  };

  const handleReset = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setUser({} as RegisteredUser);
    event.currentTarget.form?.reset();
  };

  return (
    <Card>
      <div className="sm:mx-auto sm:max-w-2xl text-left">
        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Create User
        </h3>
        {/* ToDo: replace the user prop for a properly optional prop */}
        <Form
          user={{} as RegisteredUser}
          setUser={setUser}
          submitHandler={handleCreate}
          resetHandler={handleReset}
        />
      </div>
    </Card>
  );
}
