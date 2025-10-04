import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleMap = new Map(people.map(p => [p.name, p]));
  const peopleWithParents = people.map(person => ({
    ...person,
    mother: person.motherName ? peopleMap.get(person.motherName) : undefined,
    father: person.fatherName ? peopleMap.get(person.fatherName) : undefined,
  }));

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading &&
            !isError &&
            (people.length > 0 ? (
              <PeopleTable
                people={peopleWithParents}
                selectedPersonSlug={slug || ''}
              />
            ) : (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ))}
        </div>
      </div>
    </>
  );
};
