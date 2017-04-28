import React from 'react';

function Suggestions(props) {
    const suggestions = props.suggestions.map((suggestion) => {
		return (
			<li key={suggestion} onClick={props.autoComplete}>
				{suggestion}
			</li>
		);
	});

    return (
        <div className='suggestions'>
            {suggestions.length > 0 ?
                <ul>
                    {suggestions}
                </ul>
                :
                <ul>
                    <li>No matches</li>
                </ul>
            }
        </div>
    );
}

export default Suggestions;
