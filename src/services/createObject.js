// all object post data in server
function Group(name,background,players) {
    this.name = name;
    this.background = background;
    this.players = players;
    this.games = []
}

function Gameplay(type,group,stages,summary) {
    this.game = type;
    this.group = {
        idGroup : group._id,
        name : group.name
    };
    this.stages = stages;
    this.summary = summary;
}

export {Gameplay,Group};