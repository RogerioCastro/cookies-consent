import createObservable from './observable'

/**
 * Observadores de mudança de idioma (Single Instance Pattern)
 * via: https://k94n.com/es6-modules-single-instance-pattern
 */
let translatesObserver = createObservable()

export default translatesObserver
