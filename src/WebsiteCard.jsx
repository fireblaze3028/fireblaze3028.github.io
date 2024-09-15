import PropTypes from 'prop-types';

function WebsiteCard(props) {

    return <div className='repo'>
        <h2 className='text'><a href={props.websiteSrc} target='_blank' rel='noopener noreferrer'>{props.name}</a></h2>
        <p className='text'>{props.description}</p>
        <p className='text modified'>Created: {new Date(props.createdAt).toDateString()}</p>
    </div>
}

WebsiteCard.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    imgSrc: PropTypes.string,
    websiteSrc: PropTypes.string
}

export default WebsiteCard;