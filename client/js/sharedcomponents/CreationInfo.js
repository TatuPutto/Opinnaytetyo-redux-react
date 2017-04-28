import React from 'react';
import {Link} from 'react-router';

export default function CreationInfo(props) {
    const {
        owner,
        createdAt,
        updatedAt,
        createdAtUnformatted,
        updatedAtUnformatted,
        forkInfo,
    } = props;

    return (
        <span className={'creation-info'}>
            <Link to={'/search/' + owner.login}>
                {owner.login}
            </Link>

            {createdAtUnformatted === updatedAtUnformatted && !forkInfo &&
                <p>&nbsp;<span className='bullet'>&bull;</span> created {createdAt}</p>
            }

            {createdAtUnformatted !== updatedAtUnformatted && !forkInfo &&
                <p>&nbsp;<span className='bullet'>&bull;</span> created {createdAt} &ndash; updated {updatedAt}</p>
            }

            {createdAtUnformatted === updatedAtUnformatted && forkInfo &&
                <p>&nbsp;<span className='bullet'>&bull;</span> created {createdAt} &ndash; forked from&nbsp;
                    <Link to={'/search/' + forkInfo.owner}>
                        {forkInfo.owner}
                    </Link>&nbsp;/&nbsp;
                    <Link to={'/gist/' + forkInfo.id}>
                        {name}
                    </Link>
                </p>
            }

            {createdAtUnformatted !== updatedAtUnformatted && forkInfo &&
                <p>&nbsp;<span className='bullet'>&bull;</span> updated {updatedAt} &ndash; forked from&nbsp;
                    <Link to={'/search/' + forkInfo.owner}>
                        {forkInfo.owner}
                    </Link>&nbsp;/&nbsp;
                    <Link to={'/gist/' + forkInfo.id}>
                        {name}
                    </Link>
                </p>
            }
        </span>
    );
}
