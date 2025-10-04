import classNames from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
  selectedPersonSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
}) => {
  const columnNames = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>{columnNames?.map(name => <th key={name}>{name}</th>)}</tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === selectedPersonSlug,
            })}
          >
            <td>
              <PersonLink
                slug={person.slug}
                classNames={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </PersonLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <PersonLink
                  slug={person.mother.slug}
                  classNames="has-text-danger"
                >
                  {person.mother.name}
                </PersonLink>
              ) : person.motherName ? (
                person.motherName
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink slug={person.father.slug}>
                  {person.father.name}
                </PersonLink>
              ) : person.fatherName ? (
                person.fatherName
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
