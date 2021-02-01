@extends('layouts.admin')
@section('content')


    <div class="card">
        <div class="card-header">
            Список квартир
        </div>

        <div class="card-body">
            <div class="table-responsive">

                <table class=" table table-bordered table-striped table-hover datatable">
                    <thead>
                    </thead>
                    <tbody>
                        @foreach($models['apartments'] as $index => $model)
                            @if($index%$models['maxCountApartmentOnFloor'] == 0)
                                <tr>

                                <td
                                    @if ($model->status == \App\Models\Apartment::STATUSES['sold'])
                                        bgcolor="#8fbc8f"
                                    @elseif ($model->status == \App\Models\Apartment::STATUSES['partially_sold'])
                                        bgcolor="yellow"
                                    @endif
                                >
                                    <a href="{{ route('apartments.show', $model->id) }}"  style="display:block;"> {{ $model->number }}</a>
                                </td>
                            @else
                                <td @if ($model->status == \App\Models\Apartment::STATUSES['sold'])
                                        bgcolor="#8fbc8f"
                                    @elseif ($model->status == \App\Models\Apartment::STATUSES['partially_sold'])
                                        bgcolor="yellow"
                                    @endif
                                >
                                    <a href="{{ route('apartments.show', $model->id) }}"  style="display:block;">{{ $model->number }}</a>
                                </td>
                            @endif
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>



    <div class="card">
        <div class="card-header">
            Список паркингов
        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table class=" table table-bordered table-striped table-hover datatable">
                    <thead>
                        <tr>
                            <th bgcolor="gray">B1</th>
                        </tr>
                    </thead>
                    <tbody>
                    @if(isset($models['parkings']['B1']))
                        @foreach($models['parkings']['B1'] as $index => $model)
                            @if($index%11 == 0)
                                <tr>
                                    <td
                                        @if ($model->status == \App\Models\Apartment::STATUSES['sold'])
                                        bgcolor="#8fbc8f"
                                        @elseif ($model->status == \App\Models\Apartment::STATUSES['partially_sold'])
                                        bgcolor="yellow"
                                        @endif
                                    >
                                        <a href="{{ route('apartments.show', $model->id) }}"  style="display:block;"> {{ $model->number }}</a>
                                    </td>
                                    @else
                                        <td
                                            @if ($model->status == \App\Models\Apartment::STATUSES['sold'])
                                            bgcolor="#8fbc8f"
                                            @elseif ($model->status == \App\Models\Apartment::STATUSES['partially_sold'])
                                            bgcolor="yellow"
                                            @endif
                                        >
                                            <a href="{{ route('apartments.show', $model->id) }}"  style="display:block;">{{ $model->number }}</a>
                                        </td>
                            @endif
                        @endforeach
                    @endif
                    </tbody>
                    <thead>
                        <tr>
                            <th bgcolor="gray">B2</th>
                        </tr>
                    </thead>
                    <tbody>
                    @if(isset($models['parkings']['B2']))
                        @foreach($models['parkings']['B2'] as $index => $model)
                        @if($index%11 == 0)
                            <tr>
                                <td
                                        @if ($model->status == \App\Models\Apartment::STATUSES['sold'])
                                        bgcolor="#8fbc8f"
                                        @elseif ($model->status == \App\Models\Apartment::STATUSES['partially_sold'])
                                        bgcolor="yellow"
                                        @endif
                                >
                                    <a href="{{ route('apartments.show', $model->id) }}"  style="display:block;"> {{ $model->number }}</a>
                                </td>
                                @else
                                    <td
                                            @if ($model->status == \App\Models\Apartment::STATUSES['sold'])
                                            bgcolor="#8fbc8f"
                                            @elseif ($model->status == \App\Models\Apartment::STATUSES['partially_sold'])
                                            bgcolor="yellow"
                                            @endif
                                    >
                                        <a href="{{ route('apartments.show', $model->id) }}"  style="display:block;">{{ $model->number }}</a>
                                    </td>
                        @endif
                    @endforeach
                    @endif
                    </tbody>
                    <thead>
                        <tr>
                            <th bgcolor="gray">B3</th>
                        </tr>
                    </thead>
                    <tbody>
                    @if(isset($models['parkings']['B3']))
                        @foreach($models['parkings']['B3'] as $index => $model)
                        @if($index%11 == 0)
                            <tr>
                                <td
                                        @if ($model->status == \App\Models\Apartment::STATUSES['sold'])
                                        bgcolor="#8fbc8f"
                                        @elseif ($model->status == \App\Models\Apartment::STATUSES['partially_sold'])
                                        bgcolor="yellow"
                                        @endif
                                >
                                    <a href="{{ route('apartments.show', $model->id) }}"  style="display:block;"> {{ $model->number }}</a>
                                </td>
                                @else
                                    <td
                                            @if ($model->status == \App\Models\Apartment::STATUSES['sold'])
                                            bgcolor="#8fbc8f"
                                            @elseif ($model->status == \App\Models\Apartment::STATUSES['partially_sold'])
                                            bgcolor="yellow"
                                            @endif
                                    >
                                        <a href="{{ route('apartments.show', $model->id) }}"  style="display:block;">{{ $model->number }}</a>
                                    </td>
                        @endif
                    @endforeach
                    @endif
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header">
            Список боксов
        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table class=" table table-bordered table-striped table-hover datatable">
                    <thead>
                    <tr>
                        <th bgcolor="gray">B1</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($models['boxes']['B1'] as $index => $model)
                        @if($index%7 == 0)
                            <tr>
                                <td
                                        @if ($model->status == \App\Models\Apartment::STATUSES['sold'])
                                        bgcolor="#8fbc8f"
                                        @elseif ($model->status == \App\Models\Apartment::STATUSES['partially_sold'])
                                        bgcolor="yellow"
                                        @endif
                                >
                                    <a href="{{ route('apartments.show', $model->id) }}"  style="display:block;"> {{ $model->number }}</a>
                                </td>
                                @else
                                    <td
                                            @if ($model->status == \App\Models\Apartment::STATUSES['sold'])
                                            bgcolor="#8fbc8f"
                                            @elseif ($model->status == \App\Models\Apartment::STATUSES['partially_sold'])
                                            bgcolor="yellow"
                                            @endif
                                    >
                                        <a href="{{ route('apartments.show', $model->id) }}"  style="display:block;">{{ $model->number }}</a>
                                    </td>
                        @endif
                    @endforeach
                    </tbody>
                    <thead>
                    <tr>
                        <th bgcolor="gray">B2</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($models['boxes']['B2'] as $index => $model)
                        @if($index%7 == 0)
                            <tr>
                                <td
                                        @if ($model->status == \App\Models\Apartment::STATUSES['sold'])
                                        bgcolor="#8fbc8f"
                                        @elseif ($model->status == \App\Models\Apartment::STATUSES['partially_sold'])
                                        bgcolor="yellow"
                                        @endif
                                >
                                    <a href="{{ route('apartments.show', $model->id) }}"  style="display:block;"> {{ $model->number }}</a>
                                </td>
                                @else
                                    <td
                                            @if ($model->status == \App\Models\Apartment::STATUSES['sold'])
                                            bgcolor="#8fbc8f"
                                            @elseif ($model->status == \App\Models\Apartment::STATUSES['partially_sold'])
                                            bgcolor="yellow"
                                            @endif
                                    >
                                        <a href="{{ route('apartments.show', $model->id) }}"  style="display:block;">{{ $model->number }}</a>
                                    </td>
                        @endif
                    @endforeach
                    </tbody>
                    <thead>
                    <tr>
                        <th bgcolor="gray">B3</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($models['boxes']['B3'] as $index => $model)
                        @if($index%7 == 0)
                            <tr>
                                <td
                                        @if ($model->status == \App\Models\Apartment::STATUSES['sold'])
                                        bgcolor="#8fbc8f"
                                        @elseif ($model->status == \App\Models\Apartment::STATUSES['partially_sold'])
                                        bgcolor="yellow"
                                        @endif
                                >
                                    <a href="{{ route('apartments.show', $model->id) }}"  style="display:block;"> {{ $model->number }}</a>
                                </td>
                                @else
                                    <td
                                            @if ($model->status == \App\Models\Apartment::STATUSES['sold'])
                                            bgcolor="#8fbc8f"
                                            @elseif ($model->status == \App\Models\Apartment::STATUSES['partially_sold'])
                                            bgcolor="yellow"
                                            @endif
                                    >
                                        <a href="{{ route('apartments.show', $model->id) }}"  style="display:block;">{{ $model->number }}</a>
                                    </td>
                        @endif
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@section('scripts')
    @parent
    <script>
        $('.delete-user').click(function(e){
            e.preventDefault()
            if (confirm('Are you sure?')) {
                $(e.target).closest('form').submit()
            }
        });
    </script>
@endsection
@endsection
