import '../styles/components/costsWidget.css';

type CostsWidgetProps = {
    amount: number;
    image: string;
    label: string;
};

export function CostsWidget(props: CostsWidgetProps) {
    const { amount, image, label } = props;

    return (
        <div className='costs-widget'>
            <img src={image} alt='' />
            <div className='costs-widget-values'>
                <h4>{label}</h4>
                <span>
                    {amount} {label === 'bill' && '$'}
                </span>
            </div>
        </div>
    );
}
