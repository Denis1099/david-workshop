import React from 'react';
import { PaymentButtonProps } from '../../types/payment';

const PaymentButton: React.FC<PaymentButtonProps> = ({
  seminarId,
  seminarTitle,
  seminarPrice,
  isAvailable,
  isLoading = false,
  disabled = false,
  onClick
}) => {
  const buttonText = isLoading ? 'מעבד...' : 'רכישת כרטיס';
  const isDisabled = disabled || isLoading || !isAvailable;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200
        ${isDisabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-cta hover:bg-cta/90 text-white hover:shadow-lg transform hover:scale-[1.02]'
        }
        ${isLoading ? 'animate-pulse' : ''}
      `}
      aria-label={`${buttonText} - ${seminarTitle} - ${seminarPrice} ש"ח`}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading && (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}
        <span>{buttonText}</span>
        {!isLoading && isAvailable && (
          <span className="typo-button-primary">
            {seminarPrice} ש"ח
          </span>
        )}
      </div>
    </button>
  );
};

export default PaymentButton;