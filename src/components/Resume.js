import React from 'react';
import { Button } from 'antd'

function Resume() {

    return (

        <div class="body-content">
            <Button type="primary" style={{backgroundColor: "black", border: "black"}}>
                <a href="https://docs.google.com/document/d/1uVRoPetGGsotVj9q4VgxewqEiGKhf79fc0zVk-CHlug/edit?usp=sharing">
                    View Steve's Resume
                </a>
            </Button>
        </div>
    )

}

export default Resume;