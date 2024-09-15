import React, {useEffect} from 'react'
import WebsiteCard from './WebsiteCard';
import RepoCard from './RepoCard';

var data;

var websites = [];

function Projects() {  
    function fetchData() {
        if (data === undefined) {
            fetch("https://api.github.com/users/fireblaze3028/repos")
            .then((response) => response.json())
            .then((json) => {
                data = json
                // sort in reverse chronological order
                data.sort((a, b) => {
                var atemp = new Date(a.created_at);
                var btemp = new Date(b.created_at);

                return btemp.getTime() - atemp.getTime();
                });
            }).then(() => {
                websites = [];
                data.map((repo, index) => {
                    if (repo.homepage != null && repo.homepage != "") {
                        websites.push(<RepoCard name={repo.name} description={repo.description} repoLink={repo.homepage} createdAt={repo.created_at} key={index}/>);
                    }
                })
            });
        }
    }

    useEffect(() => {fetchData()}, []);

    function handleRepos(data) {
        if (data === undefined) {
            return;
        }
        console.log(data);
        return data.map((repo, index) => {
            return <RepoCard name={repo.name} description={repo.description} repoLink={repo.html_url} createdAt={repo.created_at} key={index}/>
        })
    }

    function handleWebsites(data) {
        if (data === undefined) {
            return;
        }
        console.log(data);
        return websites
    }

    return <div className='repos'>
        {websites.length != 0 && <h1 className='text bottomline'>websites</h1>}
        {handleWebsites(data)}
        <h1 className='text bottomline'>repos</h1>
        {handleRepos(data)}
    </div>
}

export default Projects