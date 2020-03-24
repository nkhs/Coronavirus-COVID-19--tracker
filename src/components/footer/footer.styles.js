import { makeStyles, withStyles } from '@material-ui/styles/'

export const useStyles = makeStyles({

    appBar: {
        backgroundColor: '#363636',
        marginTop: '85vh',
        marginRight: '35%',
        height: '17vh',
        width: '66%',
        position: 'fixed'
    },

    toolbar: {
        display: 'flex',
        flexDirection: 'row',
    },

    title: {
        margin: 20,
        fontSize: 28,
        fontWeight: 'lighter'
    },
    '@media (max-width: 1024px)': {
        appBar: {
            marginTop: '82vh',
            height: '18vh',
            padding: 9
        },
        title: {
            margin: 20,
            fontSize: 22,
            fontWeight: 'lighter'
        },
       
    },

});