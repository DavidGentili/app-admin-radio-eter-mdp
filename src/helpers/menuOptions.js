import  { UserIcon, PodcastIcon, ReportsIcon, ProgramsIcon, AdIcon, MediaIcon }  from '../componets/Icons';

const menuOptions = [
    // {
    //     Icon: PodcastIcon,
    //     text: 'Podcast',
    //     goTo: '/podcast',
    //     aceptedSecurityLevels: ['editor', 'admin', 'master'],
    // },
    {
        Icon: ReportsIcon,
        text: 'Informes',
        goTo: '/informes',
        aceptedSecurityLevels: ['editor', 'admin', 'master'],
    },
    {
        Icon: ProgramsIcon,
        text: 'Emisiones',
        goTo: '/emisiones',
        aceptedSecurityLevels: ['admin', 'master'],
    },
    {
        Icon : MediaIcon,
        text : 'Multimedia',
        goTo : '/media',
        aceptedSecurityLevels : ['editor', 'admin', 'master']
    },
    {
        Icon: AdIcon,
        text: 'Publicidad',
        goTo: '/publicidad',
        aceptedSecurityLevels: ['admin', 'master'],
    },
    {
        Icon: UserIcon,
        text: 'Usuarios',
        goTo: '/usuarios',
        aceptedSecurityLevels: ['master'],
    }
]

export default menuOptions;