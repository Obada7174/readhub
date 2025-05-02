import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type Size = 'default' | 'sm' | 'lg' | 'icon';

interface CustomButtonProps extends MuiButtonProps {
    variantType?: Variant;
    sizeType?: Size;
    className?: string; // ✅ تأكد أن className موجود هنا
}

const StyledButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'variantType' && prop !== 'sizeType',
})<CustomButtonProps>(({ theme, variantType = 'default', sizeType = 'default' }) => {
    const baseStyles = {
        textTransform: 'none',
        borderRadius: '6px',
        fontWeight: 500,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const variantStyles: Record<Variant, any> = {
        default: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        },
        destructive: {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
            '&:hover': {
                backgroundColor: theme.palette.error.dark,
            },
        },
        outline: {
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: 'transparent',
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
        },
        secondary: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
            },
        },
        ghost: {
            backgroundColor: 'transparent',
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
        },
        link: {
            backgroundColor: 'transparent',
            color: theme.palette.primary.main,
            textDecoration: 'underline',
            '&:hover': {
                textDecoration: 'none',
            },
        },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sizeStyles: Record<Size, any> = {
        default: {
            height: '40px',
            padding: '8px 16px',
        },
        sm: {
            height: '36px',
            padding: '6px 12px',
        },
        lg: {
            height: '44px',
            padding: '10px 24px',
        },
        icon: {
            width: '40px',
            height: '40px',
            padding: 0,
            minWidth: 0,
        },
    };

    return {
        ...baseStyles,
        ...variantStyles[variantType],
        ...sizeStyles[sizeType],
    };
});
const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
    ({ variantType = 'default', sizeType = 'default', className, ...props }, ref) => {
        return (
            <div className={className}>
                <StyledButton
                    ref={ref}
                    variantType={variantType}
                    sizeType={sizeType}
                    // className={className}
                    {...props}
                />
            </div>
        );
    }
);


CustomButton.displayName = 'CustomButton';

export { CustomButton };
