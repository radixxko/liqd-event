const Event = require('../lib/event');
const event = new Event();

Event.global( 'TestEvents' );

let start = process.hrtime();

event.on( 'test', ( data ) =>
{
	console.log( 'Test handler 1', data );
});

event.on( 'test', ( ...data ) =>
{
	console.log( 'Test handler 2', ...data );
});

TestEvents.on( 'test', ( data ) =>
{
	console.log( 'Global test event', data );
})

function emit()
{
	event.emit( 'test', { foo: 'bar' });
	event.emit( 'test2', 'foo-bar' );
	event.emit( 'test', ['foo','bar']);
	event.emit( 'test', 'foo', 'bar');

	TestEvents.emit( 'test', 'foo' );

	if( process.hrtime(start)[0] < 10 )
	{
		setTimeout( emit, Math.ceil( 100 + Math.random() * 1000 ) );
	}
}

emit();
