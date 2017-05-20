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

    let creationInfoOutput = null;

    if(createdAtUnformatted === updatedAtUnformatted && !forkInfo) {
        creationInfoOutput = <p><span className="bullet"></span> created {createdAt}</p>;
    } else if(createdAtUnformatted !== updatedAtUnformatted && !forkInfo) {
        creationInfoOutput = <p>&nbsp;<span className='bullet'>&bull;</span> created {createdAt} &ndash; updated {updatedAt}</p>;
    } else if(createdAtUnformatted === updatedAtUnformatted && forkInfo) {
        creationInfoOutput = (
            <p>&nbsp;<span className='bullet'>&bull;</span> created {createdAt} &ndash; forked from&nbsp;
                <Link to={'/search/' + forkInfo.owner}>
                    {forkInfo.owner}
                </Link>
                &nbsp;/&nbsp;
                <Link to={'/gist/' + forkInfo.id}>
                    {name}
                </Link>
            </p>
        );
    } else {
        creationInfoOutput = (
            <p>&nbsp;<span className='bullet'>&bull;</span> updated {updatedAt} &ndash; forked from&nbsp;
                <Link to={'/search/' + forkInfo.owner}>
                    {forkInfo.owner}
                </Link>&nbsp;/&nbsp;
                <Link to={'/gist/' + forkInfo.id}>
                    {name}
                </Link>
            </p>
        );
    }

    return (
        <span className={'creation-info'}>
            <Link to={'/search/' + owner.login}>
                {owner.login}
            </Link>
            {creationInfoOutput}
        </span>
    );
}
