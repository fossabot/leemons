import * as _ from 'lodash';
import constants from '@users-groups-roles/constants';
import { useSession } from '@users-groups-roles/session';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ListProfiles() {
  useSession({ redirectTo: constants.frontend.login });

  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (_.isArray(router.query.id)) {
      // router.query.id[0]
    }
  }, [router.query]);

  useEffect(() => {}, []);

  const onSubmit = (data) => {};

  return (
    <>
      <div className="mb-3">Detalle perfil</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>Nombre</label>
          <input {...register('name', { required: true })} />
          {errors.name && <span>name is required</span>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}