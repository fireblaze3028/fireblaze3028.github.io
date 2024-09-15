import PropTypes from 'prop-types';

function RepoCard(props) {

    return <div className='repo'>
        <h2 className='text'><a href={props.repoLink} target='_blank' rel='noopener noreferrer'>{props.name}</a></h2>
        <p className='text'>{props.description}</p>
        <p className='text modified'>Created: {new Date(props.createdAt).toDateString()}</p>
    </div>
}

RepoCard.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    repoLink: PropTypes.string,
    createdAt: PropTypes.string,
}

export default RepoCard;