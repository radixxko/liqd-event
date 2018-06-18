'use strict';

const Event = module.exports = class Event
{
	constructor()
	{
		this._event_handlers = new Map();
	}

	on( event, handler )
	{
		let event_handlers = this._event_handlers.get( event );

		if( !event_handlers )
		{
			this._event_handlers.set( event, event_handlers = new Set() );
		}

		event_handlers.add( handler );
	}

	off( event, handler )
	{
		let event_handlers = this._event_handlers.get( event );

		if( event_handlers )
		{
			this._event_handlers.delete( handler );
		}
	}

	emit( event, ...args )
	{
		let event_handlers = this._event_handlers.get( event );

		if( event_handlers )
		{
			for( let handler of event_handlers )
			{
				handler( ...args );
			}
		}
	}

	static global( name )
	{
		if( typeof global[name] === 'undefined' )
		{
			global[name] = new Event();

			return true;
		}
		else{ return false; }
	}
}
