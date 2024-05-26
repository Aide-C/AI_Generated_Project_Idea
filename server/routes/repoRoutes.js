const express = require('express');
const {Octokit} = require('@octokit/rest');

const router = express.Router();

router.post('/results', async(req, res) => {
    try{
        const {repoName, token} = req.body;

        const octokit = new Octokit({
            auth: token
        });

        const response = await octokit.request('POST /user/repos', {
            name: repoName,
            description: 'Copy and paste generated README to here.',
            homepage: 'https://github.com',
            'private': false,
            is_template: true,
            auto_init: true,
            license: 'mit',
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          });
        
        const repo = response.data.html_url;
        res.status(200).json({ link: repo });
    }catch(err){
        console.error("Repo error:", err);
        res.status(500).json({ error: 'Failed to create repository' });
    }
});

module.exports = router;