
export default (props) => {
    console.log(props)
    return <div>
        {props.followings.map(following => {
            return <ul>
                <li>name: {following.name}</li>
                {following.muted && <li>ミュート中</li>}
                <li>{following.approved ? 'フォロー中' : '承認待ち'}</li>
            </ul>
        })}
    </div>
};
