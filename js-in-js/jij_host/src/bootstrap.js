window.app1Url = 'http://localhost:8811'

import('./main').then(({ init_host }) => init_host('host'))

import { app1 } from 'app1/app1'
